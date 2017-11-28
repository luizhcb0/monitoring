class SendEmailJob < ApplicationJob
  queue_as :default

  def perform(level)
    user = level.device.user
    device = level.device
    percentage = level.percentage
    if level.percentage <= user.setting.alert_level
      DefaultMailer.alert_email(user, device, percentage).deliver_later
    else
      DefaultMailer.normal_email(user, device, percentage).deliver_later
    end
  end
end
