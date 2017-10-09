require 'rails_helper'

RSpec.describe Api::V1::MonitoringController, type: :controller do

  describe "GET #all" do
    it "returns http success" do
      get :all
      expect(response).to have_http_status(:success)
    end
  end

end
