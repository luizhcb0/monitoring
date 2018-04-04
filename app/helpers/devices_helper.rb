module DevicesHelper

  def device_model_array
    device_model_array =  [["Nível de líquidos", "water_level"], ["Estação Meteorológica", "sigfox"]]
  end

  def device_model(x)
    if x == "water_level"
      return "Nível de líquidos"
    elsif x == "sigfox"
      return "Estação Meteorológica"
    end
  end

end
