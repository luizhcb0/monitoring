class ReceiveEmailJob < ApplicationJob
  queue_as :default

  def perform(contact)
    DefaultMailer.contact_email(contact).deliver_later
  end
end
