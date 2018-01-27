class DevicesController < ApplicationController
  include StrongParamsHolder

  before_action :authenticate_user!

  def index
    if current_user.role == "admin"
      @devices = Device.all
    else
      @devices = current_user.devices
    end
  end

  def show
    @device = Device.find(params[:id])
  end

  def new
    @dimension = Dimension.new
    @device = Device.new
  end

  def create
    @device = Device.new(device_params)
    if current_user.role != "admin"
      @device.user_id = current_user.id
    end
    if @device.save
      redirect_to devices_path
    else
      render :new
    end
  end

  def edit
    @device = Device.find(params[:id])
    @dimension = @device.dimension
  end

  def update
    @device = Device.find(params[:id])
    if params[:device][:user_ids].nil?
      @device.users = []
    end
    if @device.update_attributes(device_params)
      redirect_to devices_path
    else
      render :edit
    end
  end

  def destroy
    @device = Device.find(params[:id])
    @device.destroy
    redirect_to devices_path
  end

  def new_registration
    @device = Device.new
  end

  def registration_process
    @device = Device.where(serial: device_params[:serial]).first
    @device.users << current_user
    if @device.update_attributes(device_params)
      render json: @device
    else
      render json: @device
    end
  end

  def edit_registration
    @device = Device.where(serial: device_params[:serial]).first
    if @device.update_attributes(device_params)
      redirect_to devices_path(@device)
    end
  end

  def unregister
    @device = Device.find(params[:id])
    @device.users.delete(current_user)
    if @device.save
      redirect_to devices_path
    end
  end

  def serial_check
    @device = Device.where(serial: params[:serial])
    render json: @device
  end

  def available_check
    # Must change to allow a user to link to another device
    @device = Device.left_outer_joins(:users).where(serial: params[:serial], users: {id: [nil]})
    render json: @device
  end

end
