################################################
# Context 		: Université Bordeaux (M2 GL)
#
# Author		: @nureynisow
#
# Licence		:
#
# Description 	: All methods to read data
#
################################################

module Scrumy
	class Model
        def computePert(tasks) 
            nodes = []
            edges = []
            i = 0
            nodes.add(createNode(i))
            for t in tasks
            	t['req'] = t['req'].split(',')
            	if t['req'].empty? 
            		x = tasks.pop(t)
            		nodes.push(createNode(i+=1))
            		edges.push(createEdge(x['id'],0,i))
            	end
            end
            while(!tasks.empty?)
            	for t in tasks
            		t['req'] = t['req'].split(',')
            		if (tasks-t['req']).empty?
            			if(t['req'].length == 1)
            				x = tasks.pop()
            				nodes.push(createNode(i+=1))
            				edges.push(createEdge(x['id'],t['req'],i))
            			end
            		else
            			nodes.add(createNode(i+=1))
            			for r in t['req']
            				edges.add(createEdge('virtualTask',r,i))
            			end
            		end
            	end
            end
        end
        def createNode(i)
        	return {
        		"id"=>i,
        		"label"=>i,
        		"x"=>0,
        		"y"=>0,
        		"size"=>5
        	}
        end
        def createEdge(tag,src,tgt)
        	return {
        		"id"=>tag,
       			"source"=>src,
       			"target"=>tgt
        	}
        end
	end
end