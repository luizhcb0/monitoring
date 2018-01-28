module ApplicationHelper
  def user_array
    user_array =  User.all.map { |user| [user.name, user.id] }
  end

  def current_theme
    if current_user.nil?
      current_theme = 'dark_theme/application'
    else
      current_theme = current_user.setting.theme
    end
  end
end
