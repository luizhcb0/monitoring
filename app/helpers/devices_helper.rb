module DevicesHelper

  def device_model_array
    device_model_array =  [["Nível de líquidos", "water_level"]]
  end

  def device_model(x)
    if x == "water_level"
      return "Nível de líquidos"
    end
  end

end
