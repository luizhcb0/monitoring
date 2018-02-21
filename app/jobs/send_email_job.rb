class SendEmailJob < ApplicationJob
  queue_as :default

  def perform(level, user_device, last)
    percentage = level.percentage
    user = user_device.user
    if percentage <= user.setting.alert_level
      EmailLog.create(user: user, device: user_device.device, last_level: last, new_level: level, alert_type: 1)
      DefaultMailer.alert_email(user_device, level).deliver_later
    else
      EmailLog.create(user: user, device: user_device.device, last_level: last, new_level: level, alert_type: 0)
      DefaultMailer.normal_email(user_device, level).deliver_later
    end
  end
end
