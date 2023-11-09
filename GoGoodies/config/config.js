

// Supabase Initialisierung
const supabaseUrl = 'https://xgqaqvefiaydtcmvogvh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhncWFxdmVmaWF5ZHRjbXZvZ3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NDA0MzgsImV4cCI6MjAxMTIxNjQzOH0.zBg2S04RQnARDvGf6covdLiey7CRds0K7yU_kMzR3Ao'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }
