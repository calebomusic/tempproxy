class Api::ProxiesController < ApplicationController
  def create
    @proxy = Proxy.new(proxy_params)

    if @proxy.save
      @proxy.enqueue_task
      create_temp_link(@proxy)
      render :show
    else
      render json: @proxy.errors.full_messages, status: 422
    end
  end

  def show
    @proxy = Proxy.find_by_id(params[:id])
  end

  private
  def proxy_params
    params.require(:proxy).permit(:destination_url, :lifespan)
  end

  def create_temp_link(proxy)
    temp_link = TempLink.new
    temp_link.proxy = proxy
    temp_link.save
  end
end
