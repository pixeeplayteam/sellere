#!/usr/bin/env python3
import subprocess
import os
import sys
from pathlib import Path

def run_command(command, input_text=None):
    try:
        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            stdin=subprocess.PIPE if input_text else None,
            text=True
        )
        
        stdout, stderr = process.communicate(input=input_text)
        
        if process.returncode != 0:
            print(f"Error executing {' '.join(command)}:")
            print(stderr)
            return False
        return True
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

def generate_ssh_key():
    # Create .ssh directory if it doesn't exist
    ssh_dir = Path.home() / ".ssh"
    ssh_dir.mkdir(mode=0o700, exist_ok=True)
    
    # Generate key path
    key_path = ssh_dir / "id_ed25519"
    
    print("Generating SSH key...")
    
    # Generate the SSH key
    success = run_command(
        ["ssh-keygen", "-t", "ed25519", "-C", "arnaud@pixeeplay.com", "-f", str(key_path)],
        input_text="\n\n"  # Two newlines for empty passphrase
    )
    
    if not success:
        print("Failed to generate SSH key")
        return False
    
    # Start ssh-agent
    print("\nStarting ssh-agent...")
    success = run_command(["eval", "$(ssh-agent -s)"])
    
    # Add the key to ssh-agent
    print("\nAdding key to ssh-agent...")
    success = run_command(["ssh-add", str(key_path)])
    
    # Read and display the public key
    try:
        with open(f"{key_path}.pub", "r") as f:
            public_key = f.read().strip()
            print("\nYour public SSH key:")
            print("-" * 50)
            print(public_key)
            print("-" * 50)
            print("\nInstructions:")
            print("1. Copy the public key above")
            print("2. Go to GitHub.com")
            print("3. Click your profile photo → Settings")
            print("4. Click 'SSH and GPG keys' → 'New SSH key'")
            print("5. Paste the key and save")
    except Exception as e:
        print(f"Error reading public key: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    if generate_ssh_key():
        print("\nSSH key generation completed successfully!")
    else:
        print("\nSSH key generation failed!")
