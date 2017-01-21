class Api::TempLinksController < ApplicationController
  def create
    temp_link = TempLink.new
    @proxy = Proxy.find_by_id(params[:proxy_id])

    temp_link.proxy_id = @proxy.id

    if temp_link.save
      render :index
    else
      render json: temp_link.errors.full_messages, status: 422
    end
  end

  def show

  end

  def index
    @temp_links = TempLink.where(proxy_id: params[:proxy_id])
  end

  def destroy
    temp_link = TempLink.find_by_id(params[:id])
    temp_link.destroy!
    render json: {}
  end
end
