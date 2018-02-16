class DefaultMailer < ApplicationMailer
  default from: '"LCA Systems" <atendimento@lcasystems.com.br>'

  after_action :set_last_critical_level, only: :alert_email

  def alert_email(user, device, level)
    @user = user
    @device = device
    @level = level
    @percentage = level.percentage
    @created_at = level.created_at
    @last_cl = device.last_cl
    mail(to: @user.email, subject: 'Alerta')
  end

  def normal_email(user, device, level)
    @user = user
    @device = device
    @level = level
    @percentage = level.percentage
    @created_at = level.created_at
    @last_cl = device.last_cl
    @tbcn = level.created_at.to_i - device.last_cl.to_i

    if @tbcn < 60
      @text = "O reservatório levou #{@tbcn} segundo(s) para reestabelecer as condições normais."
    elsif @tbcn >= 60 && @tbcn < 3600
      @text = "O reservatório levou #{(@tbcn/60).round} minuto(s) para reestabelecer as condições normais."
    elsif @tbcn >= 3600 && @tbcn < 86400
      @text = "O reservatório levou aproximadamente #{(@tbcn/3600).round} hora(s) para reestabelecer as condições normais."
    elsif @tbcn >= 86400
      @text = "O reservatório levou aproximadamente #{(@tbcn/86400).round} dia(s) para reestabelecer as condições normais."
    end

    mail(to: @user.email, subject: 'Condições normalizadas')
  end

  def contact_email(contact)
    @contact = contact
    mail(to: "atendimento@lcasystems.com.br", from: "#{contact.name} <#{contact.email}>", subject: contact.subject)
  end

  private
    def set_last_critical_level
      @device.update_attributes(last_cl: @level.created_at)
    end
end
