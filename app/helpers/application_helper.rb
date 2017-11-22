module ApplicationHelper
  def user_array
    user_array =  User.all.map { |user| [user.name, user.id] }
  end
end
