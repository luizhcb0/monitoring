class DefaultMailer < ApplicationMailer
  default from: "atendimento@lcasystems.com.br"

  def alert_email(user, device, percentage)
    @user = user
    @device = device
    @percentage = percentage
    mail(to: @user.email, subject: 'Alerta')
  end
  
  def normal_email(user, device, percentage)
    @user = user
    @device = device
    @percentage = percentage
    mail(to: @user.email, subject: 'Condições normalizadas')
  end
end
