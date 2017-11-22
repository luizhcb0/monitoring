class UsersController < ApplicationController
  include StrongParamsHolder
  
  before_action :authenticate_user!

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @devices = Device.get_user_devices(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      redirect_to users_path
    else
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to users_path
  end
  
  def password_edit
    @user = User.find(params[:id])
    render :password_edit
  end
  
  def password_update
    @user = User.find(params[:id])
    if @user == current_user
      if @user.update_attributes(user_params)
        bypass_sign_in(@user)
        redirect_to users_path
      else
        redirect_to password_edit_path
      end
    else
      if @user.update_attributes(user_params)
        redirect_to users_path
      else
        redirect_to password_edit_path
      end
    end
  end
  
  def user_profile
    @devices = Device.get_user_devices(current_user.id)
    @user = User.find(current_user.id)
    render :show
  end
  
  def user_profile_edit
    @user = User.find(current_user.id)
    render :edit
  end
  
  def user_profile_update
    @user = User.find(current_user.id)
    if @user.update_attributes(user_params)
      bypass_sign_in(@user)
      redirect_to user_profile_path
    else
      redirect_to user_profile_edit_path
    end
  end
  
  def user_password_edit
    @user = User.find(current_user.id)
    render :user_password_edit
  end
  
  def user_password_update
    @user = User.find(current_user.id)
    if @user.update_attributes(user_params)
      bypass_sign_in(@user)
      redirect_to user_profile_path
    else
      redirect_to user_password_edit_path
    end
  end
end
