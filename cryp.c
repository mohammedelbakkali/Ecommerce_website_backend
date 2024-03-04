#include <stdio.h>
#include <string.h>

int main() {
    // Clé de chiffrement
    char key[] = "maCleSecrete";
    int key_size = strlen(key);
    // Message à crypter
    char message[] = "Ce message doit être crypté";
    int message_size = strlen(message);
    // Buffer pour le message crypté
    char encrypted_message[message_size];

    // Chiffrement du message
    for (int i = 0; i < message_size; i++) {
        encrypted_message[i] = message[i] ^ key[i % key_size];
    }

    // Affichage du message crypté
    for (int i = 0; i < message_size; i++) {
        printf("%c", encrypted_message[i]);
    }
    }