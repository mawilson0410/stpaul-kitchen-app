const API_URL = 'http://localhost:4000';

export async function login(password: string): Promise<string | null> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data.token;
  }
  return null;
}

export async function getFood(): Promise<any[]> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/food`, {
    headers: { 'x-session-token': token || '' },
  });
  return res.json();
}

export async function addFood(name: string): Promise<any> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/food`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-session-token': token || '',
    },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function updateFood(id: number, count: number): Promise<any> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/food/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-session-token': token || '',
    },
    body: JSON.stringify({ count }),
  });
  return res.json();
}

export async function deleteFood(id: number): Promise<any> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/food/${id}`, {
    method: 'DELETE',
    headers: { 'x-session-token': token || '' },
  });
  return res.json();
}
