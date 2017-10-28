class SendEmailJob < ApplicationJob
  queue_as :default

  def perform(level)
    @user = level.device.user
    @device = level.device
    @percentage = level.percentage
    DefaultMailer.sample_email(@user, @device, @percentage).deliver_later
  end
end
