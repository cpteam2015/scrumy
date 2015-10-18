require 'spec_helper'

describe 'server', type: feature, js: true do
  before :each do
    visit '/'
  end

  it 'has a backlog' do
    #expect(page).to have('#backlog')
  end
end
