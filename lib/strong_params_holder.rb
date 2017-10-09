module StrongParamsHolder
  def monitoring_params
    params.require(:level).permit(:device_id, :level)
  end
end