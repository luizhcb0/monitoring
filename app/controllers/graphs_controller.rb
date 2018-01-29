class GraphsController < ApplicationController

  def get_device_levels
    device_id = params[:id]
    @levels = Level.get_all_levels(device_id)
    @hash = {}
    @levels.each do |l|
      a = l.created_at.to_datetime.to_i * 1000
      @hash[a] = l.percentage.round(2)
    end

    render json: [
      name: "Reservatório #{device_id}",
      data: @hash.map {|a| a }
    ]
  end

  def get_devices_levels
    @levels = Level.get_all_devices_levels
    @hash = {}
    @array = Array.new

    @levels.each do |l|
      l.each do |i|
        a = i.created_at.to_datetime.to_i * 1000
        @hash[a] = i.percentage.round(2)
      end
      @array << @hash
      @hash = Hash.new
    end
    render json:
      @array.each_with_index.map {
        |a, index| {
          name: "Reservatório #{index + 1}", data: a.map {|b| b }
        }
      }
  end

  def get_user_devices_levels
    user_id = params[:id]
    @levels = Level.get_all_user_devices_levels(user_id)
    @hash = {}
    @array = Array.new

    @levels.each do |l|
      l.each do |i|
        a = i.created_at.to_datetime.to_i * 1000
        @hash[a] = i.percentage.round(2)
      end
      @array << @hash
      @hash = Hash.new
    end
    render json:
      @array.each_with_index.map {
        |a, index| {
          name: "Reservatório #{index + 1}", data: a.map {|b| b }
        }
      }
  end

  def get_user_devices_levels_history
    user_id = params[:id]
    @levels = Level.get_all_user_devices_levels_history(user_id)
    @hash = {}
    @array = Array.new

    @levels.each do |l|
      l.each do |i|
        a = i.created_at.to_datetime.to_i * 1000
        @hash[a] = i.percentage.round(2)
      end
      @array << @hash
      @hash = Hash.new
    end
    render json:
      @array.each_with_index.map {
        |a, index| {
          name: "Reservatório #{index + 1}", data: a.map {|b| b }
        }
      }
  end

end
