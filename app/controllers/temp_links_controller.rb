class TempLinksController < ApplicationController
  def show
    @temp_link = TempLink.find_by_slug(params[:slug])

    @temp_link.clicks += 1
    @temp_link.save

    proxy = @temp_link.proxy
    lifespan = proxy.lifespan

    if @temp_link.created_at > (Time.now - (@temp_link.proxy.lifespan * 60))
      @proxy_page = $redis.hget('proxy_pages', proxy.id)
      if @proxy_page
        render html: @proxy_page.html_safe
      else
        render html: "Page has not been retrieved. Dwell on the beauty of life. Watch the stars, and see yourself running with them. Also try refreshing."
      end
    else
      not_found
    end
  end
end
