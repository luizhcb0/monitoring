class ContactsController < ApplicationController
  include StrongParamsHolder

  def index
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      ReceiveEmailJob.set(wait: 5.seconds).perform_later(@contact)
      # flash[:success] = "Thank you for your message. We will contact you soon!"
      redirect_to root_path
    else
      # flash[:error] = "Cannot send message."
      render :new
    end
  end
end
