module Crawl
  @queue = :perform

  def self.perform(proxy_id)
    begin
      proxy = Proxy.find_by_id(proxy_id)
      http = Curl.get(proxy.destination_url)

      proxy.crawl_success = true
      proxy.save
      $redis.hset('proxy_pages', proxy.id, http.body_str)
    rescue => e
      proxy.crawl_success = false
      proxy.save
      p e
    end
  end
end
