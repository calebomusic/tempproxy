include Crawl

class Proxy < ActiveRecord::Base
  include FlagShihTzu

  has_flags 1 => :crawl_success
            # 2 => :crawl_failure

  validates :destination_url, presence: true
  has_many :temp_links

  def enqueue_task
    Resque.enqueue(Crawl, self.id)
  end
end
