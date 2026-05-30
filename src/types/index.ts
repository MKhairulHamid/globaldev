export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  background: 'it_fresh_grad' | 'professional_non_it' | 'other' | null
  occupation: string | null
  goals: string | null
  role: 'student' | 'admin'
  created_at: string
  updated_at: string
}

export interface Registration {
  id: string
  user_id: string
  cohort: string
  unique_amount: number
  payment_status: 'pending' | 'waiting_confirmation' | 'confirmed' | 'rejected'
  transfer_submitted_at: string | null
  admin_confirmed_at: string | null
  admin_confirmed_by: string | null
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export interface AdminRegistrationRow extends Registration {
  profiles: Profile
}
