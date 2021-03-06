class DefaultMailer < ApplicationMailer
  default from: "atendimento@lcasystems.com.br"

  def alert_email(user, device, percentage)
    @user = user
    @device = device
    @percentage = percentage
    @tbcl = @device.time_between_cl.to_i
    @last_cl = Time.at(@device.last_cl.to_i - @device.time_between_cl.to_i)

    if @tbcl < 60
      @text = "O reservatório levou #{@tbcl} segundos para chegar ao nível crítico."
    elsif @tbcl >= 60 && @tbcl < 3600
      @text = "O reservatório levou #{(@tbcl/60).round} minutos para chegar ao nível crítico."
    elsif @tbcl >= 3600 && @tbcl < 86400
      @text = "O reservatório levou #{(@tbcl/3600).round} horas para chegar ao nível crítico."
    elsif @tbcl >= 86400
      @text = "O reservatório levou #{(@tbcl/86400).round} dias para chegar ao nível crítico."
    end

    mail(to: @user.email, subject: 'Alerta')
  end

  def normal_email(user, device, percentage)
    @user = user
    @device = device
    @percentage = percentage
    mail(to: @user.email, subject: 'Condições normalizadas')
  end
end
