--[[
  setnxAndExpire
]]

-- get args
local key, value, expire = KEYS[1], ARGV[1], ARGV[2]

-- sennx
local nxresult = redis.call('SETNX', key, value)

-- expire
if nxresult == 1 then
  redis.call('EXPIRE', key, expire)
end

-- return
return nxresult