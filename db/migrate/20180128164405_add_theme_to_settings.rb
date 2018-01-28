class AddThemeToSettings < ActiveRecord::Migration[5.0]
  def change
    add_column :settings, :theme, :integer, default: 1
  end
end
