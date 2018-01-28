module ApplicationHelper
  def user_array
    user_array =  User.all.map { |user| [user.name, user.id] }
  end

  def current_theme
    # current_theme = current_user.theme || 'default'
    current_theme = 'dark_theme/application'
  end
end
