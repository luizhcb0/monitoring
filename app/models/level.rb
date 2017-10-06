class Level < ApplicationRecord
  belongs_to :module
  
  def self.get_current_level(module_id)
    where(module_id: module_id).maximum(:id)
  end
  
  def self.get_all_current_levels
    levels = Array.new
    Module.all.each do |mod|
      levels <<  where(module_id: mod.id).maximum(:id)
    end
    return levels
  end
  
  def self.get_all_modules_levels
    levels = Array.new
    Module.all.each do |mod|
      levels <<  where(module_id: mod.id)
    end
    return levels
  end
  
  def self.get_all_levels(module_id)
    levels = where(module_id: module_id)
    return levels
  end
end
