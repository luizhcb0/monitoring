class DefaultMailer < ApplicationMailer
  default from: "atendimento@lcasystems.com.br"

  def sample_email(user, device, percentage)
    @user = user
    @device = device
    @percentage = percentage
    mail(to: @user.email, subject: 'Alerta')
  end
end
