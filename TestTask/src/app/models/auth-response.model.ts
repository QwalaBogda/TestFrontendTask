export interface AuthResponse { token: string; }

export interface NewsItem {
id: number;
title: string;
description?: string;
image?: string;
created_at?: string;
}

export interface Position {
id: number;
name: string;
latitude: number;
longitude: number;
detail: string;
}