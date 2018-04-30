class DevicesController < ApplicationController
  include StrongParamsHolder

  before_action :authenticate_user!

  def index
    if current_user.role == "admin"
      @devices = Device.all
    else
      @devices = current_user.devices
      @user_devices = UserDevice.where(user: current_user)
    end
  end

  def show
    @device = Device.find(params[:id])
    @user_device = UserDevice.where(user: current_user, device: @device).first
  end

  def new
    @dimension = Dimension.new
    @device = Device.new
  end

  def create
    @dimension = Dimension.new
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
    @user_device = UserDevice.where(user: current_user, device: @device).first
    if @device.dimension.present?
      @dimension = @device.dimension
    else
      @dimension = Dimension.new
    end
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
    @dimension = Dimension.new
    @device = Device.new
    @user_device = UserDevice.new
  end

  def registration_process
    @user_device = UserDevice.new
    @device = Device.where(serial: device_params[:serial]).first
    if @device.nil?
      @device = Device.new
      @device.errors.add(:serial, "Número de Série inválido")
      render :new_registration
    else
      @user_device = @device.user_devices.build(user_device_params).with_user(current_user)
      if @user_device.save
        @device.update_attributes(device_params) if @device.model == "water_level"
        render json: @user_device
      else
        render json: @user_device
      end
    end
  end

  def edit_registration
    @device = Device.where(serial: device_params[:serial]).first
    @user_device = UserDevice.where(device: @device, user: current_user).first
    if @device.update_attributes(device_params) && @user_device.update_attributes(user_device_params)
      redirect_to devices_path(@device)
    else
      render :edit
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
