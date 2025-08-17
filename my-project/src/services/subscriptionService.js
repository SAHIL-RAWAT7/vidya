// src/services/subscriptionService.js
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Subscription failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
};