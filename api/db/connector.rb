# coding: utf-8
require 'mongo'

# Connecteur générique pour une collection de BDD MongoDB
class Connector
  def initialize args
    Mongo::Logger.logger.level = ::Logger::FATAL
    
    mongo_client = Mongo::Client.new [args[:url]],
                                     database: args[:db_name],
                                     user: args[:user],
                                     password: args[:pwd]
    
    @collection = mongo_client[args[:coll]]
  end
  
  def find_all
    array = []
    @collection.find.each do |doc|
      doc[:_id] = doc[:_id].to_s
      array.push doc
    end
    array
  end
  
  def find id
    found = @collection.find _id: BSON::ObjectId.from_string(id)
    found = found.find.first
    found[:_id] = found[:_id].to_s
    found
  end

  def delete id
    @collection.find(_id: BSON::ObjectId.from_string(id)).delete_one
  end

  def insert doc
    @collection.insert_one doc
  end

  def replace doc
    id = BSON::ObjectId.from_string doc['_id']
    doc['_id'] = id
    @collection.find(_id: id).replace_one doc
  end
end
