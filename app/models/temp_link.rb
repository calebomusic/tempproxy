class TempLink < ActiveRecord::Base
  belongs_to :proxy

  after_initialize :ensure_slug, :default_clicks

  def default_clicks
    self.clicks ||= 0
  end

  def ensure_slug
    chars = ('a'..'z').to_a + (0..9).to_a
    temp_link_slug = ''

    11.times { temp_link_slug += chars[rand(36)].to_s }

    self.slug ||= temp_link_slug
  end
end
