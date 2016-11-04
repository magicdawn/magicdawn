struct AuthRequest {
  1: string token,
}

struct AuthResponse {
  1: bool success,
  2: ErrorBody error,
  3: DataBody data
}

struct ErrorBody {
  1: string code,
  2: string message
}

struct DataBody {
  1: string uid
}

service AuthService{
   AuthResponse getAuthResult(1:AuthRequest data)
}