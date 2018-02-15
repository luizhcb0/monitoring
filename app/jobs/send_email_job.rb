class SendEmailJob < ApplicationJob
  queue_as :default

  def perform(level, user)
    device = level.device
    percentage = level.percentage
    if percentage <= user.setting.alert_level
      DefaultMailer.alert_email(user, device, level).deliver_later
    else
      DefaultMailer.normal_email(user, device, level).deliver_later
    end
  end
end
