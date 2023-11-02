console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://bozfzrhiqlvfviucecib.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvemZ6cmhpcWx2ZnZpdWNlY2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzY3MzgsImV4cCI6MjAxMTkxMjczOH0.88e4mZUM5qp37YN1KQr4MYEozYRbKdIK4gG3NcLHdoA'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }
