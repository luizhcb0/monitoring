class User < ApplicationRecord
  after_create :set_settings

  has_one :setting
  has_many :user_devices
  has_many :devices, through: :user_devices
  has_many :email_logs
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  enum role: %w(admin default)

  private
    def set_settings
      setting = Setting.create(alert_level: 0)
      self.setting = setting
    end

end
