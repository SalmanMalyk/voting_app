@extends('layouts.master')

@section('body')    
   @isset($slot)
      {{ $slot }}
   @endisset
@endsection
