class SendEmailJob < ApplicationJob
  queue_as :default

  def perform(level, user_device)
    percentage = level.percentage
    user = user_device.user
    if percentage <= user.setting.alert_level
      DefaultMailer.alert_email(user_device, level).deliver_later
    else
      DefaultMailer.normal_email(user_device, level).deliver_later
    end
  end
end
