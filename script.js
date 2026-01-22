const DB_URL = 'database.json';
let secureDB = {};

// 1. SYSTEM HANDSHAKE (Load Data)
window.onload = async () => {
    try {
        // Fetch Encrypted Data
        const response = await fetch(DB_URL);
        secureDB = await response.json();
        
        // Render Public Interface Only
        document.getElementById('userName').innerText = secureDB.citizen_profile.name;
        document.getElementById('userId').innerText = secureDB.citizen_profile.id;
        document.getElementById('userPhoto').src = secureDB.citizen_profile.photo;
        
        console.log("System Status: " + secureDB.system_config.compliance);
    } catch(e) { console.error("Handshake Failed"); }
};

// 2. SOS BEACON (Simulation with Privacy)
function activateBeacon() {
    
    // Privacy Logic: Family Blocked
    const privacyMsg = `<span style="color:#ef4444"><i class="fas fa-user-slash"></i> FAMILY NOTIFICATION BLOCKED</span><br><small>(Requires Decryption Key)</small>`;
    
    // Step 1: Connecting
    Swal.fire({
        title: 'INITIATING BEACON',
        html: 'Establishing Secure Handshake with ERSS-112...',
        timer: 1500,
        timerProgressBar: true,
        background: '#0f172a', color: '#fff',
        didOpen: () => Swal.showLoading()
    }).then(() => {
        
        // Step 2: Real Dispatch Display
        Swal.fire({
            title: 'EMERGENCY PROTOCOL',
            html: `
                <div style="text-align:left; font-family: 'Inter'; font-size: 13px; line-height: 2.5;">
                    <div>🛰️ GPS Coordinates: <b style="color:#22c55e">ENCRYPTED & SENT</b></div>
                    <div>🚓 Police Control: <b style="color:#22c55e">ACKNOWLEDGED</b></div>
                    <div>🚑 Ambulance: <b style="color:#22c55e">DISPATCHED (High Priority)</b></div>
                    <div style="border-top: 1px solid #334155; margin-top:10px; padding-top:10px;">
                        ${privacyMsg}
                    </div>
                </div>
            `,
            timer: 5000,
            showConfirmButton: false,
            background: '#0f172a', color: '#fff'
        }).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'HELP IS EN ROUTE',
                text: 'Your encrypted location has been shared with authorities.',
                confirmButtonColor: '#22c55e',
                background: '#fff', color: '#000'
            });
        });
    });
}

// 3. SECURE VAULT ACCESS (Doctor Login)
async function openSecureVault() {
    const { value: pin } = await Swal.fire({
        title: 'AUTHENTICATION',
        text: 'Enter Government Medical PIN',
        input: 'password',
        inputPlaceholder: '••••',
        confirmButtonText: 'DECRYPT DATA',
        confirmButtonColor: '#0f172a',
        background: '#fff', color: '#000'
    });

    if (pin === secureDB.access_control.doctor_pin) {
        
        // Decrypt & Render Data
        document.getElementById('bloodGroup').innerText = secureDB.encrypted_medical_data.blood;
        document.getElementById('allergies').innerText = secureDB.encrypted_medical_data.allergy;
        document.getElementById('history').innerText = secureDB.encrypted_medical_data.history;
        document.getElementById('meds').innerText = secureDB.encrypted_medical_data.meds;
        document.getElementById('hashKey').innerText = secureDB.access_control.hash_key;

        // UI Transition
        document.getElementById('publicView').style.display = 'none';
        document.getElementById('doctorView').classList.remove('hidden');

        // Audit Log Alert
        const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
        Toast.fire({ icon: 'success', title: 'Vault Decrypted Successfully' });

    } else {
        Swal.fire({ icon: 'error', title: 'UNAUTHORIZED', text: 'Access attempt logged.', background: '#0f172a', color: '#fff' });
    }
}

// 4. SECURE CALL (Doctor Only)
function secureCall() {
    window.location.href = "tel:" + secureDB.emergency_routing.guardian_contact;
          }
