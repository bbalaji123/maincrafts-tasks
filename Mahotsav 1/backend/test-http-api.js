const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/coordinator/registrations/unpaid',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer fake_token_for_test',
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      console.log('=== API Response ===');
      console.log('Success:', response.success);
      console.log('Count:', response.count);
      console.log('\n=== First 3 Participants ===');
      
      if (response.participants && response.participants.length > 0) {
        for (let i = 0; i < Math.min(3, response.participants.length); i++) {
          const p = response.participants[i];
          console.log(`\n${i + 1}. ${p.name} (${p.userId})`);
          console.log('   eventNames field exists:', 'eventNames' in p ? 'YES' : 'NO');
          console.log('   eventNames:', p.eventNames);
          console.log('   event:', p.event);
        }
        
        // Find CHITTI specifically
        const chitti = response.participants.find(p => p.userId === 'MH26000224');
        if (chitti) {
          console.log('\n=== CHITTI (MH26000224) ===');
          console.log('eventNames:', chitti.eventNames);
          console.log('Has eventNames:', chitti.eventNames && chitti.eventNames.length > 0 ? 'YES' : 'NO');
          console.log('Event field:', chitti.event);
        }
      }
    } catch (error) {
      console.error('Error parsing response:', error);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.end();
