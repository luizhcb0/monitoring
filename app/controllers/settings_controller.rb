class SettingsController < ApplicationController
  include StrongParamsHolder

  before_action :authenticate_user!

  def index
    @user = current_user
    @setting = @user.setting
  end

  def update
    @setting = Setting.find(params[:id])
    if @setting.update_attributes(setting_params)
      redirect_to root_path
    else
      render :index
    end
  end

end
