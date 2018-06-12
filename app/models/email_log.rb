class EmailLog < ApplicationRecord
  belongs_to :last_level, class_name: 'Level'
  belongs_to :new_level, class_name: 'Level'
  belongs_to :last_temperature, class_name: 'Temperature'
  belongs_to :new_temperature, class_name: 'Temperature'
  belongs_to :last_humidity, class_name: 'Humidity'
  belongs_to :new_humidity, class_name: 'Humidity'
  belongs_to :last_atm_pressure, class_name: 'AtmPressure'
  belongs_to :new_atm_pressure, class_name: 'AtmPressure'
  belongs_to :last_luminosity, class_name: 'Luminosity'
  belongs_to :new_luminosity, class_name: 'Luminosity'

  belongs_to :user
  belongs_to :device

  enum alert_type: %w(normal alert)
end
