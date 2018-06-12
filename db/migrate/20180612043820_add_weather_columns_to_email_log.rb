class AddWeatherColumnsToEmailLog < ActiveRecord::Migration[5.0]
  def change
    remove_reference :email_logs, :new_level
    remove_reference :email_logs, :last_level
    add_reference :email_logs, :new_level
    add_reference :email_logs, :last_level
    add_reference :email_logs, :new_temperature
    add_reference :email_logs, :last_temperature
    add_reference :email_logs, :new_humidity
    add_reference :email_logs, :last_humidity
    add_reference :email_logs, :new_atm_pressure
    add_reference :email_logs, :last_atm_pressure
    add_reference :email_logs, :new_luminosity
    add_reference :email_logs, :last_luminosity
  end
end
