class Api::TempLinksController < ApplicationController
  def create
    temp_link = TempLink.new
    @proxy = Proxy.find_by_id(params[:proxy_id])

    temp_link.proxy_id = @proxy.id

    if temp_link.save
      render :show
    else
      render json: temp_link.errors.full_messages, status: 422
    end
  end

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

  def index
    @temp_links = TempLink.where(proxy_id: params[:proxy_id])
  end

  def destroy
    temp_link = TempLink.find_by_id(params[:id])
    proxy = temp_link.proxy
    temp_link.destroy
    redirect_to proxy_url(proxy)
  end
end
