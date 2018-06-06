class WeatherGraphsController < ApplicationController
  include StrongParamsHolder

  before_action :authenticate_user!

  def get_temperatures
    device_id = params[:id]
    device = Device.find(device_id)
    @data = Temperature.get_temperatures(device.id)
    @hash = {}
    @data.each do |d|
      a = d.created_at.to_datetime.to_i * 1000
      @hash[a] = d.data.round(1)
    end

    respond_to do |format|
      format.html {
        render json: [
          name: "Dispositivo #{device.serial}",
          data: @hash.map {|a| a }
        ]
      }
      format.json {
        render json: [
          name: "Dispositivo #{device.serial}",
          data: @hash.map {|a| a }
        ]
      }
    end
  end

  def get_humidities
    device_id = params[:id]
    device = Device.find(device_id)
    @data = Humidity.get_humidities(device.id)
    @hash = {}
    @data.each do |d|
      a = d.created_at.to_datetime.to_i * 1000
      @hash[a] = d.data.round(1)
    end

    respond_to do |format|
      format.html {
        render json: [
          name: "Dispositivo #{device.serial}",
          data: @hash.map {|a| a }
        ]
      }
      format.json {
        render json: [
          name: "Dispositivo #{device.serial}",
          data: @hash.map {|a| a }
        ]
      }
    end
  end

  def get_luminosities
    device_id = params[:id]
    device = Device.find(device_id)
    @data = Luminosity.get_luminosities(device.id)
    @hash = {}
    @data.each do |d|
      a = d.created_at.to_datetime.to_i * 1000
      @hash[a] = d.data.round(1)
    end

    respond_to do |format|
      format.html {
        render json: [
          name: "Dispositivo #{device.serial}",
          data: @hash.map {|a| a }
        ]
      }
      format.json {
        render json: [
          name: "Dispositivo #{device.serial}",
          data: @hash.map {|a| a }
        ]
      }
    end
  end

  def get_atm_pressures
    device_id = params[:id]
    device = Device.find(device_id)
    @data = AtmPressure.get_atm_pressures(device.id)
    @hash = {}
    @data.each do |d|
      a = d.created_at.to_datetime.to_i * 1000
      @hash[a] = d.data.round(1)
    end

    respond_to do |format|
      format.html {
        render json: [
          name: "Dispositivo #{device.serial}",
          data: @hash.map {|a| a }
        ]
      }
      format.json {
        render json: [
          name: "Dispositivo #{device.serial}",
          data: @hash.map {|a| a }
        ]
      }
    end
  end


end
