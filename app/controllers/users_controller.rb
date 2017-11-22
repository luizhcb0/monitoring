class UsersController < ApplicationController
  include StrongParamsHolder

  before_action :authenticate_user!

  def index
    @users = User.all.order(:name)
  end

  def show
    @user = User.find(params[:id])
    @devices = Device.get_user_devices(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def edit_password
    @user = User.find(params[:id])
    render :edit_password
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      redirect_to user_path(@user.id)
    else
      render :edit
    end
  end

  def password_update
    @user = User.find(params[:id])
    if @user == current_user
      if @user.update_attributes(user_params)
        bypass_sign_in(@user)
        redirect_to root_path
      else
        redirect_to edit_password_path
      end
    else
      if @user.update_attributes(user_params)
        redirect_to root_path
      else
        redirect_to edit_password_path
      end
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to users_path
  end

  def profile
    @user = User.find(current_user.id)
    render :show
  end

  def edit_profile
    @user = User.find(current_user.id)
    render :edit
  end

  def profile_update
    @user = User.find(current_user.id)
    if @user.update_attributes(user_params)
      redirect_to user_path(@user.id)
    else
      render :edit
    end
  end

  def edit_profile_password
    @user = User.find(current_user.id)
    render :edit_password
  end

  def profile_password_update
    @user = User.find(current_user.id)
    if @user.update_attributes(user_params)
      bypass_sign_in(@user)
      redirect_to root_path
    else
      redirect_to edit_profile_password_path
    end
  end

end
