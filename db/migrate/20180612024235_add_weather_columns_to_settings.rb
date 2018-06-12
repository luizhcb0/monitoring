class AddWeatherColumnsToSettings < ActiveRecord::Migration[5.0]
  def change
    add_column :settings, :temperature_alert, :float
    add_column :settings, :humidity_alert, :float
    add_column :settings, :atm_pressure_alert, :float
    add_column :settings, :luminosity_alert, :float
  end
end
