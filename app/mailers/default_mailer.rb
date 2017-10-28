class DefaultMailer < ApplicationMailer
  default from: "luizhcb0@gmail.com"

  def sample_email(user, device, percentage)
    @user = user
    @device = device
    @percentage = percentage
    mail(to: @user.email, subject: 'Alerta')
  end
end
